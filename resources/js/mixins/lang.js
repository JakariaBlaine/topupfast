
module.exports = {
  methods: {
    /**
     * Translate the given key.
     */
    __(key, replace = {}) {
      var translation = this.$page.lang[key]
        ? this.$page.lang[key]
        : key
      Object.keys(replace).forEach(function (key) {
        translation = translation.replace(':' + key, replace[key])
      });
      return translation
    },

    /**
     * Translate the given key with basic pluralization.
     */
    __n(key, number, replace = {}) {
      var options = key.split('|');

      key = options[1];
      if(number == 1) {
        key = options[0];
      }

      return tt(key, replace);
    },
    currentLanguage() {
      return this.$page.language;
    },
    current() {
      return this.$page.current_url;
    }
  },
}
