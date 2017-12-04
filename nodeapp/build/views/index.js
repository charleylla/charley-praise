"use strict";

module.exports = templateParams => {
    // css 列表
    const _cssList = ["main"];
    // 引入 webAssetsHelp
    const webAssetsHelp = require("./webAssetsHelp")(templateParams, _cssList);
    // HTML 模板字符串
    const _html = `
        {% extends "./layout.html" %}
        {% block title %}My Page{% endblock %}
        {% block styles %}
            ${webAssetsHelp.styles}
        {% endblock %}
        {% block content %}
            {% include "../widget/index.html" %}
        {% endblock %}
        {% block script %}
            ${webAssetsHelp.scripts}
        {% endblock %}
    `;

    return _html;
};