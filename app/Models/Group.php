<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $table = 'groups';

    protected $fillable = ['title'];

    protected $with = ['tasks'];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
