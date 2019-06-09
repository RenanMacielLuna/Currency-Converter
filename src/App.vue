/* eslint-disable no-undef */
<template>
  <v-app>
    <v-container grid-list-xl>
      <v-flex xs12 sm4>
        <p>Source</p>
        <v-overflow-btn
          id="dropdown-src"
          :items="currenciesNames"
          editable
          v-model="src"
          v-on:change="hideResult"
        ></v-overflow-btn>
      </v-flex>

      <v-flex xs12 sm4>
        <p>Destination</p>
        <v-overflow-btn
          id="dropdown-dst"
          :items="currenciesNames"
          editable
          v-model="dst"
          v-on:change="hideResult"
        ></v-overflow-btn>
      </v-flex>

      <v-flex xs12 sm4>
        <v-text-field v-model="amt" type="number" label="Amount" min="1"></v-text-field>
      </v-flex>

      <div>
        <v-btn large color="primary" @click="convert">Convert</v-btn>
      </div>
      <div id="conv-result" v-if="seen">
        <h1>{{amt}} {{src}} equals {{value.toFixed(2)}} {{dst}}</h1>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Currency from "./services/currencies";

export default {
  mounted() {
    Currency.list().then(response => {
      this.currencies = response.data.rates;
      this.currenciesNames = Object.keys(this.currencies);
    });
  },
  data: () => ({
    currenciesNames: [],
    currencies: [],
    src: "",
    dst: "",
    value: {},
    seen: false,
    amt: ""
  }),
  methods: {
    convert() {
      Currency.convert(this.src, this.dst).then(response => {
        if (this.src != "" && this.dst != "") {
          this.seen = true;
          this.value = this.amt * Number(Object.values(response.data.rates));
        }
      });
    },
    hideResult() {
      this.seen = false;
    }
  }
};
</script>
