const categoryFunc = (data: any, parentId = null) => {
  let categorylist: any = [];
  let list;
  if (!parentId) {
    list = data.filter((e: any) => e.parentId == undefined);
  } else {
    list = data.filter((e: any) => e.parentId == parentId);
  }
  list.forEach((element: any) =>
    categorylist.push({
      _id: element._id,
      name: element.name,
      slug: element.slug,
      image: element.image,
      children: categoryFunc(data, element._id),
    })
  );

  return categorylist;
};

export default categoryFunc;
