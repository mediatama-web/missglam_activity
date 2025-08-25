<?php

use App\Http\Controllers\Backend\{
    DashboardController,
    RolePermissionController,
    StoreController,
    UserController,
};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Role & Permission
    Route::get('permission', [RolePermissionController::class, 'index'])->name('permission.index');
    Route::post('permission/store', [RolePermissionController::class, 'store'])->name('permission.store');
    Route::post('permission/storeRole', [RolePermissionController::class, 'storeRole'])->name('permission.storeRole');
    Route::put('permission/{role}/update', [RolePermissionController::class, 'update'])->name('permission.update');

    // store 
    Route::get('store', [StoreController::class, 'index'])->name('store.index');
    Route::get('store/create', [StoreController::class, 'create'])->name('store.create');
    Route::post('store', [StoreController::class, 'store'])->name('store.store');
    Route::get('store/{store}/edit', [StoreController::class, 'edit'])->name('store.edit');
    Route::put('store/{store}', [StoreController::class, 'update'])->name('store.update');
    Route::delete('store/{store}', [StoreController::class, 'destroy'])->name('store.destroy');

    // team
    Route::get('team', [UserController::class, 'index'])->name('team');
    Route::get('team/create', [UserController::class, 'create'])->name('team.create');
    Route::post('team', [UserController::class, 'store'])->name('team.store');
    Route::get('team/{user}/edit', [UserController::class, 'edit'])->name('team.edit');
    Route::put('team/{user}', [UserController::class, 'update'])->name('team.update');
    Route::delete('team/{user}', [UserController::class, 'destroy'])->name('team.destroy');

    // chat
    Route::get('chat', function () {
        return Inertia::render('admin/chat/index');
    })->name('chat');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
