using BusTicketReservation.Domain.Entities;

namespace BusTicketReservation.Application.Contracts.Repositories;

public interface IRepository<TEntity, TKey> where TEntity : IEntity<TKey>
{
    Task<TEntity?> GetByIdAsync(TKey id);
    Task<List<TEntity>> GetAllAsync();
    Task<TEntity> AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(TKey id);
    IQueryable<TEntity> GetQueryable();
}