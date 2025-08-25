<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['store'] = Store::get();
        return Inertia::render('admin/store/index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/store/create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:stores,name',
            'alamat' => 'required|string',
        ], [
            'name.unique' => 'Store name already exists',
            'name.required' => 'Store name is required',
            'alamat.required' => 'Store address is required',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            Store::create([
                'name' => $request->name,
                'alamat' => $request->alamat,
            ]);
            DB::commit();
            return redirect()->route('store.index')->with('success', 'Store created successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Failed to create store');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Store $store)
    {
        $data['store'] = $store;
        return Inertia::render('admin/store/edit/index', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Store $store)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'alamat' => 'required|string',
        ], [
            'name.required' => 'Store name is required',
            'alamat.required' => 'Store address is required',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            $store->update([
                'name' => $request->name,
                'alamat' => $request->alamat,
            ]);
            DB::commit();
            return redirect()->route('store.index')->with('success', 'Store updated successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Failed to update store');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store)
    {
        $store->delete();
        return redirect()->route('store.index')->with('success', 'Store deleted successfully');
    }
}
