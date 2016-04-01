{{ -- tpl: autocomplete-template -- }}
    <ul class="dropdown-menu">
        <%
            var len = _this.length;
            if (len) {
                for (var i = 0; i < len; i++) {
                    var item = _this[i];
        %>
                    <li class="auto-item" data-code="<%= item.code %>" data-name="<%= item.name %>"><a href="javascript:;"><%= item.name %></a></li>
        <%
                }
            } else {
        %>
                <li class="no-data-item"><a href="javascript:;">没查询到数据</a></li>
        <%
            }
        %>
    </ul>
{{ -- /tpl -- }}