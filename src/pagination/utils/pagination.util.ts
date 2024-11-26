import { PaginationDto } from "../dto/pagination.dto";

export async function paginatePrisma<T>(
  model: any, // Modelo de Prisma
  paginationDto: PaginationDto,
  where?: object, // Opcional: filtros adicionales
  orderBy?: object // Opcional: ordenamiento
) {
  const { page, limit } = paginationDto;
  const skip = (page - 1) * limit;

  // Consulta de datos paginados
  const items = await model.findMany({
    where,
    orderBy,
    skip,
    take: limit,
  });

  // Conteo total
  const total = await model.count({ where });

  return {
    items,
    total,
    page,
    limit,
  };
}
