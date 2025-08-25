<?php

use App\Http\Controllers\Backend\{
    DashboardController,
    RolePermissionController,
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

    // chat
    Route::get('chat', function () {
        return Inertia::render('admin/chat/index');
    })->name('chat');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
