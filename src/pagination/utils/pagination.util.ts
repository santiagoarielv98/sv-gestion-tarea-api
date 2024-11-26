import { PaginationDto } from "../dto/pagination.dto";

export async function paginatePrisma<T>(
  model: any, // Modelo de Prisma
  paginationDto: PaginationDto,
  where?: object, // Opcional: filtros adicionales
  orderBy?: object, // Opcional: ordenamiento
  include?: object // Opcional: relaciones a incluir
) {
  const { page, limit } = paginationDto;
  const skip = (page - 1) * limit;

  // Consulta de datos paginados
  const items = await model.findMany({
    where,
    orderBy,
    skip,
    take: limit,
    include,
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
