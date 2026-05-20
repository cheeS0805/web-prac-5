const prisma = require('../lib/prisma');

class DepartmentService {
  async getDepartments() {
    return prisma.department.findMany({ orderBy: { name: 'asc' } });
  }
}

module.exports = new DepartmentService();
