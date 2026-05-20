const prisma = require('../lib/prisma');

class UserService {
  async getUsers({ search, sortBy, sortOrder, page, limit }) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: { department: true },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { department: true },
    });
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
  }

  async createUser(data) {
    const dept = await prisma.department.findUnique({ where: { id: data.departmentId } });
    if (!dept) throw { status: 400, message: 'Department not found' };

    return prisma.user.create({
      data,
      include: { department: true },
    });
  }

  async updateUser(id, data) {
    await this.getUserById(id);

    if (data.departmentId) {
      const dept = await prisma.department.findUnique({ where: { id: data.departmentId } });
      if (!dept) throw { status: 400, message: 'Department not found' };
    }

    return prisma.user.update({
      where: { id },
      data,
      include: { department: true },
    });
  }

  async deleteUser(id) {
    await this.getUserById(id);
    await prisma.user.delete({ where: { id } });
  }
}

module.exports = new UserService();
