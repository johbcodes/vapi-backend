export default function makeUserDb({ User }) {
  async function findOne(filter, options = {}) {
    const { populate } = options;
    const query = User.findOne(filter);

    if (populate) {
      for (const p of populate) {
        query.populate(p);
      }
    }

    return await query.lean().exec();
  }

  async function insert(userInfo) {
    return await User.create(userInfo);
  }

  async function update(filter, userInfo) {
    return await User.findOneAndUpdate(filter, userInfo, { new: false });
  }

  async function destroy(id) {
    const res = await User.deleteOne({ _id: id });
    return {
      found: res.n,
      deleted: res.deletedCount,
    };
  }

  async function find(filter, options = {}) {
    const { populate, sort } = options;
    const query = User.find(filter);

    if (populate) {
      for (const p of populate) {
        query.populate(p);
      }
    }

    if (sort) {
      query.sort(sort);
    }

    return await query.lean().exec();
  }

  async function aggregate(pipeline = []) {
    return await User.aggregate(pipeline);
  }

  async function countDocuments(filter = {}) {
    return await User.countDocuments(filter);
  }

  async function paginate(query, options) {
    const { sort, populate, page, limit } = options;
    return await User.paginate(query, {
      sort,
      lean: true,
      page,
      limit,
      populate,
    });
  }

  return Object.freeze({
    findOne,
    insert,
    update,
    find,
    aggregate,
    paginate,
    destroy,
    countDocuments,
  });
}
