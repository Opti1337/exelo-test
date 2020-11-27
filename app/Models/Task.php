<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    
    protected $fillable = ['group_id', 'value', 'completed'];

    protected $casts = [
        'completed' => 'boolean'
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
