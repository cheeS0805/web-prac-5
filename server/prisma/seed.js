const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const departments = await Promise.all([
    prisma.department.upsert({ where: { name: 'Розробка' }, update: {}, create: { name: 'Розробка' } }),
    prisma.department.upsert({ where: { name: 'Маркетинг' }, update: {}, create: { name: 'Маркетинг' } }),
    prisma.department.upsert({ where: { name: 'Підтримка' }, update: {}, create: { name: 'Підтримка' } }),
    prisma.department.upsert({ where: { name: 'HR' }, update: {}, create: { name: 'HR' } }),
  ]);

  const users = [
    { firstName: 'Іван', lastName: 'Петренко', email: 'ivan.petrenko@example.com', phone: '+380501234567', departmentId: departments[0].id },
    { firstName: 'Олена', lastName: 'Коваль', email: 'olena.koval@example.com', phone: '+380672345678', departmentId: departments[0].id },
    { firstName: 'Максим', lastName: 'Сисюмка', email: 'maks.sysiumka@example.com', phone: '+380633456789', departmentId: departments[1].id },
    { firstName: 'Анна', lastName: 'Бондаренко', email: 'anna.bondarenko@example.com', phone: null, departmentId: departments[1].id },
    { firstName: 'Дмитро', lastName: 'Шевченко', email: 'dmytro.shevchenko@example.com', phone: '+380504567890', departmentId: departments[2].id },
    { firstName: 'Наталія', lastName: 'Мельник', email: 'natalia.melnyk@example.com', phone: '+380675678901', departmentId: departments[2].id },
    { firstName: 'Олексій', lastName: 'Гриценко', email: 'oleksii.hrytsenko@example.com', phone: null, departmentId: departments[3].id },
    { firstName: 'Вікторія', lastName: 'Ткаченко', email: 'viktoria.tkachenko@example.com', phone: '+380636789012', departmentId: departments[3].id },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Базу даних заповнено тестовими даними');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
