<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Task;

class TasksController extends Controller
{
    public function store(Request $request, Group $group)
    {
        $data = $request->validate([
            'value' => ['required', 'min:1']
        ]);

        $task = $group->tasks()->create([
            'value' => $data['value'],
            'completed' => false
        ]);

        return response()->json($task);
    }

    public function update(Request $request, Group $group, Task $task)
    {
        $data = $request->validate([
            'completed' => ['boolean']
        ]);

        if ($task) {
            $task->update([
                'completed' => $data['completed']
            ]);
        }

        return response()->json($task);
    }

    public function destroy(Request $request, Group $group, Task $task)
    {
        if ($task) {
            $task->delete();
        }
    }
}
