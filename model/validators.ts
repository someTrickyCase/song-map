const validators = {
  numberaze: (item: string | number | null) => {
    if (typeof item === "string") {
      return +item.split(",").join("");
    }
    if (typeof item === "number") {
      return item;
    }
    return 1;
  },
};

export { validators };
