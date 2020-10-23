<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Seeder;

class InitGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $groups = [
            "INF3dlm-a",
            "INF3dlm-b"
        ];

        foreach ($groups as $key => $g) {
            $group = new Group();
            $group->name = $g;
            $group->save();
        }
    }
}
