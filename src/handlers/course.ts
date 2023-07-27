import { validationResult } from "express-validator";
import prisma from "../db";
import { createPaginator } from 'prisma-pagination'
import { Course, Prisma } from "@prisma/client";

// I would like to display 5 courses per page
const paginate = createPaginator({});

export const getCoures = async (req, res) => {

    // I would like to fetch all the courses on the based on instructor id
    // 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // call the paginate

    const results = await paginate<Course, Prisma.CourseFindManyArgs>(
        prisma.course,
        {
            where: {
                // title: {
                //     contains: 'Nodejs'
                // }
                instructorId: +req.params.instructorId,
            },
            include: {
                Instructor: true
            },
            orderBy: {
                id: 'desc'
            }
        },
        {
            page: +req.query.page,
            perPage: req.query.perPage
        }
    )
    // const courses = await prisma.course.findMany({
    //     where: {
    //         instructorId: +req.params.instructorId
    //     },
    //     include: {
    //         Instructor: true
    //     }
    // });
    res.status(200).json(results);
}

export const createCourse = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const course = await prisma.course.create({
        data: {
            title: req.body.title,
            desc: req.body.desc,
            duration: req.body.duration,
            instructorId: req.body.instructorId
        }
    })
    return res.status(201).json(course);
}

export const getCourseById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const course = await prisma.course.findUnique({ where: { id: +req.params.id } });
    if (!course) {
        return res.status(404).json({ err: 'could not find course' });
    }
    return res.status(200).json(course);
}

export const deleteCourseById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const course = await prisma.course.findUnique({ where: { id: +req.params.id } });
    if (!course) {
        return res.status(404).json({ err: 'could not find course' });
    }

    const deletedCourse = await prisma.course.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    return res.status(200).json(deletedCourse);
}

// write the handler function
export const updateCourse = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const course = await prisma.course.findUnique({ where: { id: +req.params.id } });
    if (!course) {
        return res.status(404).json({ err: 'could not find course' });
    }
    const updatedCourse = await prisma.course.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    });
    return res.status(200).json(updatedCourse)

}