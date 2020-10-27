<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'description' => "Lorem ipsum",
            'end_date' => $this->faker->dateTimeInInterval("+ 10 days", "+15 days"),
            'priority' => $this->faker->randomElement([1, 2, 3, 4, 5]),
            'workbook_id' => null,
        ];
    }
}
