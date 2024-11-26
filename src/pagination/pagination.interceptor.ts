import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class PaginationInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(
        (data: { items: T[]; total: number; page: number; limit: number }) => {
          const { items, total, page, limit } = data;
          const totalPages = Math.ceil(total / limit);

          return {
            data: items,
            meta: {
              totalItems: total,
              totalPages,
              currentPage: page,
              itemsPerPage: limit,
            },
          };
        }
      )
    );
  }
}
