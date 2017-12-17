module.exports = (templateParams) => {
    // css 列表
    const _cssList = ["main"];
    // 引入 webAssetsHelp
    const webAssetsHelp = require("./webAssetsHelp")(templateParams,_cssList);
    // 此函数用来判断 LocalStorage 中有没有存放 scripts，如果存放了 scripts，就引用 LocalStorage 中的内容
    // 如果没有存放文件，就直接通过 src 引用
    function getScriptTags(){
        const { scriptsList } = webAssetsHelp;
        return `
            <script>
                const scriptsList = ${JSON.stringify(scriptsList)};
                scriptsList.forEach((v,k) => {
                    if(localStorage.getItem(v)){
                        const scriptTag = document.createElement("script");
                        scriptTag.innerHTML = localStorage.getItem(v);
                        document.head.appendChild(scriptTag);
                    }else{
                        // localStorage.clear();
                        LazyLoad.js(scriptsList,()=>{})
                    }
                });
            </script>
        `
    }
    // HTML 模板字符串
    const _html = `
        {% extends "./layout.html" %}
        {% block title %}点赞组件副本{% endblock %}
        {% block styles %}
            ${webAssetsHelp.styles}
        {% endblock %}
        {% block content %}
            {% include "../widget/star.html" %}
        {% endblock %}
        {% block script %}
        ${getScriptTags()}
        {% endblock %}
    `;

    return _html;
}