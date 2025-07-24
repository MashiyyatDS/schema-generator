<?php

namespace AppModels;

use IlluminateDatabaseEloquentFactoriesHasFactory;
use IlluminateDatabaseEloquentRelationsMorphMany;
use IlluminateDatabaseEloquentSoftDeletes;
use IlluminateDatabaseEloquentBuilder;
use OwenItAuditingContractsAuditable;
use IlluminateDatabaseEloquentModel;

class User extends Model implements Auditable
{
    use HasFactory, SoftDeletes;
    use OwenItAuditingAuditable;

    public function scopeSearch(Builder $query, ?string $search): void
    {
        $query->where('id', $search)
			->orWhere('first_name', 'like', "%{$search}%")
			->orWhere('middle_name', 'like', "%{$search}%")
			->orWhere('last_name', 'like', "%{$search}%")
			->orWhere('contact', 'like', "%{$search}%")
			->orWhere('email', 'like', "%{$search}%")
			->orWhere('created_at', 'like', "%{$search}%")
            ->orWhere('updated_at', 'like', "%{$search}%");
    }

    public function logs(): MorphMany
    {
        return $this->morphMany(Audit::class, 'auditable');
    }
}