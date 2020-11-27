<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class GroupsController extends Controller
{
    public function index()
    {
        return response()->json(Group::all());
    }

    public function show(Group $group)
    {
        return response()->json($group);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'min:1']
        ]);

        $group = Group::create([
            'title' => $data['title']
        ])->fresh();

        return response()->json($group);
    }
}
