import { Fields } from "./Fields";

export class View
{
   constructor (field: Fields)
   {
      let container = $("<div />");

      let a = $("<a />");
      a.addClass("queue-workitem-buttons");

      let icon = $("<span />");
      icon.addClass("queue-workitem-buttons-icon");

      let svg = $("<svg />");
      svg.attr("width", "15");
      svg.attr("height", "15");
      svg.attr("viewBox", "2 2 16 16");
      svg.attr("fill", "currentColor");
      svg.attr("xmlns", "http://www.w3.org/2000/svg");

      let path = $("<path />");
      path.attr("d", "M11.079 13.9l4.568-3.281a.719.719 0 000-1.238L11.079 6.1A.716.716 0 0010 6.719V8c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z");

      let text = $("<span />");
      text.addClass("queue-workitem-buttons-text");
      text.text(field.buttonsName);

      svg.append(path);
      icon.append(svg);
      icon.append(text);
      a.append(icon);
      container.append(a);

      a.on("click", () => { field.buttonPressed(); });

      $("body").append(container);

      VSS.resize();
   }
}