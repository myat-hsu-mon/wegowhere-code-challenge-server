import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') userId: string, @Res() response) {
    try {
      const user = await this.usersService.getUserById(userId);
      return response.status(HttpStatus.OK).json({
        message: ['success'],
        error: null,
        data: user,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: [error.message],
        data: null,
      });
    }
  }
}
