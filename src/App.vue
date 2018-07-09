<template>
    <div>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <hello-component :name="name" :initialEnthusiasm="5" />
        <h1>Hello Decorator Component</h1>
        <hello-decorator-component :name="name" :initialEnthusiasm="5" />
    </div>
</template>

<script>
import HelloComponent from "./components/Hello.vue";
import HelloDecoratorComponent from "./components/HelloDecorator.vue";
export default {
  name: "App",
  data(){
      return { name: "World" }
  },
  components: {
    HelloComponent,
    HelloDecoratorComponent
  }
};
</script>

