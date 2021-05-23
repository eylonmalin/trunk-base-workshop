import * as weatherIcons from "../icons.json";

export const weatherIconsProvider = icon_id => {
    const prefix = "wi wi-";
    return prefix + weatherIcons.default[icon_id].icon;
};

