<?php

namespace App\Http\Controllers;

use App\Http\Requests\Workbook\StoreWorkbookRequest;
use Illuminate\Http\Request;
use App\Models\Workbook;
use Dotenv\Validator;

class WorkbookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = [];

        if ($request->has("name")) {
            $filters[] = ["name", "like,", "%" . $request->get("name") . "%"];
        }

        return Workbook::where($filters)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWorkbookRequest $request)
    {

        $workbook = new Workbook();
        $workbook->name = $request->input('name');
        $workbook->group_id = $request->input('group_id');
        $workbook->user_id = $request->input('user_id');

        $workbook->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
