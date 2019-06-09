import { http } from "./config";

export default {
    list: () => {
        return http.get();
    },
    convert: (src, dst) => {
        return http.get(
            `https://api.exchangeratesapi.io/latest?base=${src}&symbols=${dst}`
        );
    }
};