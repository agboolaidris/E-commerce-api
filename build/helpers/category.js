"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryFunc = (data, parentId = null) => {
    let categorylist = [];
    let list;
    if (!parentId) {
        list = data.filter((e) => e.parentId == undefined);
    }
    else {
        list = data.filter((e) => e.parentId == parentId);
    }
    list.forEach((element) => categorylist.push({
        _id: element._id,
        name: element.name,
        slug: element.slug,
        image: element.image,
        children: categoryFunc(data, element._id),
    }));
    return categorylist;
};
exports.default = categoryFunc;
//# sourceMappingURL=category.js.map