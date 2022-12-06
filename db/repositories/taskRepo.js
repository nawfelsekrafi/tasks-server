const taskModel = require("../models/taskModel");
const APIFeatures = require("../../utils/apiFeatures");

module.exports = class TaskRepo {
  static findOneByObjSelect(obj, select) {
    return taskModel.findOne(obj).select(select);
  }

  static findOneByObj(obj) {
    return taskModel.findOne(obj);
  }

  static create(payload) {
    return taskModel.create(payload);
  }

  static findById(id) {
    return taskModel.findById(id);
  }

  static findByIdAndUpdate(id, payload) {
    return taskModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
  }

  static async findByObjPaginate(obj, options, query) {
    let deleted = query.deleted == "true" ? true : false;

    const features = new APIFeatures(
      deleted
        ? taskModel.find({ ...obj, deletedAt: { $ne: null } })
        : taskModel.find({ ...obj, deletedAt: null }),
      query
    )
      .filter()
      .sort()
      .limitFields()
      .search(["title", "description"]);

    let optionsPaginate = {
      limit: options.limit ? options.limit : null,
      page: options.page ? options.page : null,
    };

    const pagination = taskModel.paginate(features.query, optionsPaginate);
    return await pagination;
  }

  static async deleteTask(task) {
    return taskModel
      .findByIdAndUpdate(
        task._id,
        {
          $set: { deletedAt: Date.now() },
        },
        { new: true }
      )
      .lean()
      .exec();
  }
};
