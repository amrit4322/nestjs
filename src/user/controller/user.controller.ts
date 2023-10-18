import { Body, Controller, Post,Res,HttpStatus, Put, Param, Get, Delete } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { response } from 'express';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';

@Controller('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Res() response, @Body() createUserDTO: CreateUserDTO) {
        try {
        const newUser = await this.userService.createUser(createUserDTO);
        return response.status(HttpStatus.CREATED).json({
            message:'User created successfully',
            newUser,
        })
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode:400,
                message:'Error! User not created',
                error:'Bad request',
            })
        }
    }

    @Put("/:id")
    async updateUser(@Res() response, @Param("id") username:string,@Body() updateUserDTO: UpdateUserDTO) {
        try{
            const existingUser  = await this.userService.updateUser(username,updateUserDTO);
            return response.status(HttpStatus.OK).json({
                message:"User updated successfully",
                existingUser,
            })
            
        }catch(err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getUsers(@Res() response){
        try{
            const userData = await this.userService.getAllUser();
            return response.status(HttpStatus.OK).json({
                message:"All data of user found successfully",
                userData,
            })

        }catch(err){
            return response.status(err.status).json(err.response);
        }
    }
    @Get("/:id")
    async getUser(@Res() response,@Param("id") username:string ){
        try{
            const userData = await this.userService.getUser(username);
            return response.status(HttpStatus.OK).json({
                message:"Data found successfully",
                userData,
            })

        }catch(err){
            return response.status(err.status).json(err.response);
        }

    }
    @Delete("/:id")
    async deleteUser(@Res() response,@Param("id") username:string){
        try{
            const deletedUser = await this.userService.deletUser(username);
            return response.status(HttpStatus.OK).json({
                message:"Data deleted Successfully",
                deletedUser,
            })
        }catch(err){
            return response.status(err.status).json(err.response);
        }
    }

}
