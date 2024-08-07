export default function makeRoleDb({ Role }) {
  async function findOne(filter, options = {}) {
    const { populate } = options;
    const query = Role.findOne(filter);

    if (populate) {
      for (const p of populate) {
        query.populate(p);
      }
    }

    return await query.lean().exec();
  }

  async function insert(roleInfo) {
    return await Role.create(roleInfo);
  }

  async function update(filter, roleInfo) {
    return await Role.findOneAndUpdate(filter, roleInfo);
  }

  async function destroy(id) {
    const res = await Role.deleteOne({ _id: id });
    return {
      found: res.n,
      deleted: res.deletedCount,
    };
  }

  async function find(filter, options = {}) {
    const { populate } = options;
    const query = Role.find(filter);

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
