import eventPublisher from "./event-publisher";

class Store {
  constructor() {
    this.virtualSpheros = [];
  }
}

const store = new Store();

eventPublisher.subscribe("addSphero", spheroName => {
  store.virtualSpheros.push(spheroName);
});

eventPublisher.subscribe("removeSphero", spheroName => {
  const virtualSpheroIndex = store.virtualSpheros.indexOf(spheroName);
  if (virtualSpheroIndex < 0) {
    throw new Error("A virtualSphero didn't found : " + spheroName);
  }
  store.virtualSpheros.splice(virtualSpheroIndex, 1);
});

export default store;
