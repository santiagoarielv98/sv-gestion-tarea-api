import { InvalidFieldForSortingException } from "exeptions/invalid-field-for-sorting.exception";
import { PaginationDto } from "../dto/pagination.dto";
import { Prisma } from "@prisma/client";

export async function paginatePrisma<T>(
  model: any, // Modelo de Prisma
  paginationDto: PaginationDto,
  where?: object, // Opcional: filtros adicionales
  orderBy?: object, // Opcional: ordenamiento
  include?: object // Opcional: relaciones a incluir
) {
  const { page, limit } = paginationDto;
  const skip = (page - 1) * limit;

  // chequear que el key de orderBy sea un campo válido
  if (orderBy) {
    const table = Prisma.dmmf.datamodel.models.find(
      (m) => m.name === model.name
    );

    const fields = table.fields.map((f) => f.name);

    const keys = Object.keys(orderBy);
    keys.forEach((key) => {
      if (!fields.includes(key)) {
        throw new InvalidFieldForSortingException(key);
      }
    });
  }

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
