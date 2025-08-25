<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // permission dashboard
        Permission::create(['name' => 'dashboard index', 'guard_name' => 'web']);

        //permission users
        Permission::create(['name' => 'users index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users create', 'guard_name' => 'web']);
        Permission::create(['name' => 'users edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'users delete', 'guard_name' => 'web']);

        //permission roles
        Permission::create(['name' => 'roles index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles create', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles delete', 'guard_name' => 'web']);

        //permission permissions
        Permission::create(['name' => 'permissions index', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions create', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions delete', 'guard_name' => 'web']);

        //permission team
        Permission::create(['name' => 'team index', 'guard_name' => 'web']);
        Permission::create(['name' => 'team create', 'guard_name' => 'web']);
        Permission::create(['name' => 'team edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'team delete', 'guard_name' => 'web']);

        //permission izin
        Permission::create(['name' => 'izin index', 'guard_name' => 'web']);
        Permission::create(['name' => 'izin create', 'guard_name' => 'web']);
        Permission::create(['name' => 'izin edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'izin delete', 'guard_name' => 'web']);

        //permission store
        Permission::create(['name' => 'store index', 'guard_name' => 'web']);
        Permission::create(['name' => 'store create', 'guard_name' => 'web']);
        Permission::create(['name' => 'store edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'store delete', 'guard_name' => 'web']);

        //permission warning
        Permission::create(['name' => 'warning index', 'guard_name' => 'web']);
        Permission::create(['name' => 'warning create', 'guard_name' => 'web']);
        Permission::create(['name' => 'warning edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'warning delete', 'guard_name' => 'web']);

        //permission point
        Permission::create(['name' => 'point index', 'guard_name' => 'web']);
        Permission::create(['name' => 'point create', 'guard_name' => 'web']);
        Permission::create(['name' => 'point edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'point delete', 'guard_name' => 'web']);

        //permission activity
        Permission::create(['name' => 'activity index', 'guard_name' => 'web']);
        Permission::create(['name' => 'activity create', 'guard_name' => 'web']);
        Permission::create(['name' => 'activity edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'activity delete', 'guard_name' => 'web']);

        //permission attendace
        Permission::create(['name' => 'attendace index', 'guard_name' => 'web']);
        Permission::create(['name' => 'attendace create', 'guard_name' => 'web']);
        Permission::create(['name' => 'attendace edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'attendace delete', 'guard_name' => 'web']);

        //permission report cctv
        Permission::create(['name' => 'report cctv index', 'guard_name' => 'web']);
        Permission::create(['name' => 'report cctv create', 'guard_name' => 'web']);
        Permission::create(['name' => 'report cctv edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'report cctv delete', 'guard_name' => 'web']);

        $role = Role::findOrCreate('Administrator');
        $role = Role::findOrCreate('Team CCTV');
        $role = Role::findOrCreate('Store Leader');
        $role = Role::findOrCreate('Store Leader');
        $role = Role::findOrCreate('Chief Leader');
        $role = Role::findOrCreate('Admin Store');
        $role = Role::findOrCreate('Admin Receive');
        $role = Role::findOrCreate('Checker');
        $role = Role::findOrCreate('Staff Dept');
        $role = Role::findOrCreate('BA');
        $role = Role::findOrCreate('Security');

        $permissions = Permission::all();
        $role = Role::find(1);
        $role->syncPermissions($permissions);

        $user = User::create([
            'name'      => 'Administrator',
            'email'     => 'admin@gmail.com',
            'password'  => Hash::make('admin123'),
        ]);

        $user->assignRole($role);
    }
}
