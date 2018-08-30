const hljs = require('highlight.js');

const md = require('markdown-it')({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(lang, str.trim(), true).value}</code></pre>`;
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str.trim())}</code></pre>`;
  },
});

module.exports = (sequelize, DataTypes) => {
  const Snippet = sequelize.define(
    'Snippet',
    {
      // campos estrangeiros não ficam aqui
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      getterMethods: {
        except() {
          return this.content.length > 120
            ? `${this.content.substring(0, this.content.lastIndexOf(' ', 120))}...`
            : this.content;
        },
        formattedContent() {
          return md.render(this.content);
        },
      },
    },
  );

  // É preciso informar pro model que existe
  // uma associação dele com o model de usuário.
  // Isso é feito da forma abaixo:
  Snippet.associate = (models) => {
    Snippet.belongsTo(models.Category);
  };

  return Snippet;
};
