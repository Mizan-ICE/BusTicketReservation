using BusTicketReservation.Application.Contracts.Repositories;
using BusTicketReservation.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusTicketReservation.Infrastructure.Repositories;

public class Repository<TEntity, TKey>:IRepository<TEntity, TKey> 
    where TEntity : class, IEntity<TKey>
{
    private readonly DbContext _context;
    private readonly DbSet<TEntity> _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }

    public virtual async Task<TEntity?> GetByIdAsync(TKey id)
    {
        return await _dbSet.FindAsync(new object[] { id });
    }

    public virtual async Task<List<TEntity>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public virtual async Task<TEntity> AddAsync(TEntity entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public virtual Task UpdateAsync(TEntity entity)
    {
        _dbSet.Update(entity);
        return Task.CompletedTask;
    }

    public virtual async Task DeleteAsync(TKey id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
        }
    }

    public virtual IQueryable<TEntity> GetQueryable()
    {
        return _dbSet.AsQueryable();
    }
}