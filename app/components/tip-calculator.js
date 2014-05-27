var TipCalculatorComponent = Ember.Component.extend({
  tipPercents: [{
    value: 10,
    label: "Cheapskate"
  }, {
    value: 15,
    label: "Minimal"
  }, {
    value: 20,
    label: "Average"
  }, {
    value: 25,
    label: "Generous"
  }, {
    value: 30,
    label: "Rich guy"
  }],
  roundTip: false,
  amount: null,
  selectedTipPercent: 0,
  tip: Ember.computed('selectedTipPercent', 'amount', 'roundTip',
    function () {
      var amount = this._getAmount();
      var tip = this.get('selectedTipPercent') / 100 * amount;
      var roundTip = this.get('roundTip');
      if (roundTip) {
        tip = Math.round(tip);
      }
      return tip.toFixed(2);
    }),
  total: 0,

  _getAmount: function () {
    var amount = parseFloat(this.get('amount')) || 0;
    return amount;
  },

  _getTip: function () {
    var tip = parseFloat(this.get('tip'));
    return tip;
  },

  _updateTotal: function () {
    var amount = this._getAmount();
    var tip = this._getTip();
    var total = amount + tip;
    this.set('total', total.toFixed(2));
  },

  didInsertElement: function () {
    var tipPercents = this.get('tipPercents');
    var index = parseInt(tipPercents.length / 2, 0);
    this.set('selectedTipPercent', tipPercents[index].value);
    var zero = 0;
    this.set('total', zero.toFixed(2));
    this.addObserver('tip', this, this._updateTotal);
  },

  willDestroyElement: function () {
    this.removeObserver('tip');
  },

  actions: {
    incrementBy10: function () {
      var amount = this._getAmount();
      this.set('amount', (amount + 10).toFixed(2));
    },
    incrementBy1: function () {
      var amount = this._getAmount();
      this.set('amount', (amount + 1).toFixed(2));
    },
    clearAmount: function () {
      this.set('amount', null);
    },
    selectTip: function (item) {
      this.set("selectedTipPercent", item.value);
    }
  }
});

export
default TipCalculatorComponent;
