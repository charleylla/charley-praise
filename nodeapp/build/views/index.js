"use strict";

module.exports = templateParams => {
    // css 列表
    const _cssList = ["main"];
    // 引入 webAssetsHelp
    const webAssetsHelp = require("./webAssetsHelp")(templateParams, _cssList);
    // 此函数用来判断 LocalStorage 中有没有存放 scripts，如果存放了 scripts，就引用 LocalStorage 中的内容
    // 如果没有存放文件，就通过 src 引用，然后将其存放到 LocalStorage 中
    // 这里有个优化点，就是多次发版后，LocalStorage 中可能保存多个文件
    // 我们可以通过文件后缀的 md5 值，在发版后移除掉老版本的 LocalStorage
    // 下次会直接从 LocalStorage 中去取，取到后放入 head 中
    // 这样就节约了 http 请求（即使是缓存协商），也加快了速度
    // 这里进行了一个初步的前端负载均衡
    function getScriptTags() {
        const { scriptsList } = webAssetsHelp;
        // 生产环境指定了 ip 地址后，getScript 获取的数据是 undefined
        // 应为跨域的原因
        return `
            <script>
                const scriptsList = ${JSON.stringify(scriptsList)};
                scriptsList.forEach((v,k) => {
                    if(localStorage.getItem(v)){
                        const scriptTag = document.createElement("script");
                        scriptTag.innerHTML = localStorage.getItem(v);
                        document.head.appendChild(scriptTag);
                    }else{
                        $.getScript({
                            url:v,
                            success(data){
                                localStorage.setItem(v,data);
                            }
                        })
                    }
                });
            </script>
        `;
    }
    // HTML 模板字符串
    const _html = `
        {% extends "./layout.html" %}
        {% block title %}点赞组件{% endblock %}
        {% block styles %}
            ${webAssetsHelp.styles}
        {% endblock %}
        {% block content %}
            {% include "../widget/index.html" %}
        {% endblock %}
        {% block script %}
        ${getScriptTags()}
        {% endblock %}
    `;

    return _html;
};