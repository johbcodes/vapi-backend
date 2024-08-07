export default function makeSubscriptionDb({ Subscription }) {
  async function findOne(filter, options = {}) {
    const { populate, sort } = options;
    const query = Subscription.findOne(filter);

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

  async function insert(subscriptionInfo) {
    return await Subscription.create(subscriptionInfo);
  }

  async function update(filter, subscriptionInfo) {
    return await Subscription.findOneAndUpdate(filter, subscriptionInfo, { new: true });
  }

  async function destroy(id) {
    const res = await Subscription.deleteOne({ _id: id });
    return {
      found: res.n,
      deleted: res.deletedCount,
    };
  }

  async function find(filter, options = {}) {
    const { populate } = options;
    const query = Subscription.find(filter);

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
