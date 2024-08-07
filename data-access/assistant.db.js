export default function makeAssistantDb({ Assistant }) {
  async function findOne(filter, options = {}) {
    const { populate, sort } = options;
    const query = Assistant.findOne(filter);

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

  async function insert(assistantInfo) {
    return await Assistant.create(assistantInfo);
  }

  async function update(filter, assistantInfo) {
    return await Assistant.findOneAndUpdate(filter, assistantInfo, { new: true });
  }

  async function destroy(id) {
    const res = await Assistant.deleteOne({ _id: id });
    return {
      found: res.n,
      deleted: res.deletedCount,
    };
  }

  async function find(filter, options = {}) {
    const { populate } = options;
    const query = Assistant.find(filter);

    if (populate) {
      for (const p of populate) {
        query.populate(p);
      }
    }

    return await query.lean().exec();
  }

  return Object.freeze({
    findOne,
    insert,
    update,
    find,
    destroy,
  });
}
