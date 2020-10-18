<template>
  <div class="fluid container">
    <div class="col-md-12">
      <draggable class="list-group" tag="ul" v-model="cities" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" :name="'flip-list'">
          <li class="list-group-item" v-for="element in cities" :key="element.value">
            <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
            {{element.name}}
            <span class="badge">{{element.order}}</span>
          </li>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { db } from '../firebase';
export default {
  name: "Settings",
  cities: [],
  mounted() {
    const citiesRef = db.ref("/cities");
    citiesRef
      .once("value")
      .then((snapshot) => {
        const val = snapshot.val();
        this.cities = Object.values(val);
      });

      citiesRef.on("value", (snapshot) => {
        const val = snapshot.val();
        this.cities = Object.values(val);
      })
  },
  components: {
    draggable
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false,
      cities: this.cities
    };
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });

      const updateObj = {}

      this.cities.forEach((c, i) => {
        updateObj[i] = c;
      })

      const cityRef = db.ref("cities");
      cityRef.update(updateObj)
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
