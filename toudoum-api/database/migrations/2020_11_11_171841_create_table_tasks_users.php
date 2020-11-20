<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableTasksUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks_users', function (Blueprint $table) {
            $table->id();
            $table->boolean('checked');

            // $table->integer('task_id')->unsigned()->index();
            $table->foreignId('task_id')->references('id')->on('tasks');

            // $table->integer('user_id')->unsigned()->index();
            $table->foreignId('user_id')->references('id')->on('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks_users');
    }
}
