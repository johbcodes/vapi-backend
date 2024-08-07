import { logError } from '../config/logger.js';

export default function makePermissionDb({ Permission }) {
  async function findOne(filter, options = {}) {
    const { populate } = options;
    const query = Permission.findOne(filter);

    if (populate) {
      for (const p of populate) {
        query.populate(p);
      }
    }

    return await query.lean().exec();
  }

  async function insert(permissionInfo) {
    return await Permission.create(permissionInfo);
  }

  async function update(filter, name) {
    return await Permission.findOneAndUpdate(filter, name);
  }

  async function destroy(id) {
    const res = await Permission.deleteOne({ _id: id });
    return {
      found: res.n,
      deleted: res.deletedCount,
    };
  }

  async function find(filter, options = {}) {
    const { search } = options;
    const query = Permission.find(filter);

    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
      query.where({ name: { $regex: searchRegex } });
    }

    return await query.lean().exec();
  }

  async function findPermissionsByIds(permissionIds) {
    try {
      const permissions = await Permission.find({
        _id: { $in: permissionIds },
      })
        .lean()
        .exec();
      return permissions;
    } catch (error) {
      console.error('Error while finding permission by ids:', {
        error: error.message,
        stack: error.stack,
      });
      logError.error('Error while finding permission by ids:', {
        error: error.message,
        stack: error.stack,
      });
    }
  }

  return Object.freeze({
    findOne,
    insert,
    update,
    find,
    destroy,
    findPermissionsByIds,
  });
}
