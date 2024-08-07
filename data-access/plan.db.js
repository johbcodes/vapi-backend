export default function makePlanDb({ Plan }) {
  async function findOne(filter, options = {}) {
    const { populate } = options;
    const query = Plan.findOne(filter);

    if (populate) {
      for (const p of populate) {
        query.populate(p);
      }
    }

    return await query.lean().exec();
  }

  async function insert(planInfo) {
    return await Plan.create(planInfo);
  }

  async function update(filter, planInfo) {
    return await Plan.findOneAndUpdate(filter, planInfo);
  }

  async function destroy(id) {
    const res = await Plan.deleteOne({ _id: id });
    return {
      found: res.n,
      deleted: res.deletedCount,
    };
  }

  async function find(filter, options = {}) {
    const { populate } = options;
    const query = Plan.find(filter);

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
