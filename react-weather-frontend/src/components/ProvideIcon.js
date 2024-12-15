import * as weatherIcons from "../weather-icons.json";
import * as emojiIcons from "../emoji-icons.json";

export const weatherIconsProvider = icon_id => {
    if (true) {
        const prefix = "em em-";
        return prefix + emojiIcons.default[icon_id].icon;
    } else {
        const prefix = "wi wi-";
        return prefix + weatherIcons.default[icon_id].icon;
    }
};

