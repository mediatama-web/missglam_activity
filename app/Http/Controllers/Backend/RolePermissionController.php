<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    public function index()
    {
        // dd(User::role(['Administrator', 'Team CCTV'])->get());
        // dd(User::with('roles')->get());
        return Inertia::render('admin/permission/index', [
            'roles' => Role::with('permissions')->get(),
            'permissions' => Permission::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'permission_name' => 'required|string|unique:permissions,name',
        ], [
            'permission_name.unique' => 'Permission not found',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::begintransaction();

        try {
            Permission::create([
                'name' => $request->permission_name,
            ]);
            DB::commit();
            return back()->with('success', 'Permission created successfully');
        } catch (\Throwable $th) {
            dd($th);
            DB::rollBack();
            return back()->with('error', 'Failed to create permission');
        }
    }

    public function storeRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role_name' => 'required|string|unique:roles,name'
        ], [
            'role_name.unique' => 'Role not found',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::begintransaction();

        try {
            Role::create([
                'name' => $request->role_name
            ]);
            DB::commit();
            return back()->with('success', 'Role created successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Failed to create role');
        }
    }

    public function update(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'permissions' => 'array',
            'permissions.*' => 'string|exists:permissions,name',
        ], [
            'permissions.*.exists' => 'Permission not found',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::begintransaction();

        try {
            $role->syncPermissions($request->permissions);
            DB::commit();
            return back()->with('success', 'Permission updated successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', 'Failed to update permission');
        }
    }
}
