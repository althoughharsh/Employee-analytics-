const Employee = require('../models/Employee');

// @desc    Get all employees (shared + user's own)
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({
      $or: [
        { userId: null }, // Shared employees (visible to all)
        { userId: req.user.id } // User's own employees
      ]
    }).sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

// @desc    Search employees by department
// @route   GET /api/employees/search
// @access  Private
const searchEmployees = async (req, res, next) => {
  try {
    const { department } = req.query;
    
    if (!department) {
      res.status(400);
      throw new Error('Please provide a department to search');
    }

    const employees = await Employee.find({ 
      $and: [
        { department: { $regex: new RegExp(department, 'i') } },
        {
          $or: [
            { userId: null }, // Shared employees
            { userId: req.user.id } // User's own employees
          ]
        }
      ]
    }).sort({ createdAt: -1 });
    
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

// @desc    Create an employee
// @route   POST /api/employees
// @access  Private
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;

    if (!name || !email || !department || !skills || performanceScore === undefined || experience === undefined) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Check for duplicate email
    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
      res.status(400);
      throw new Error('Employee with this email already exists');
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
      performanceScore,
      experience,
      userId: req.user.id // Attach to current user
    });

    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private
const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee (only own employees, not shared)
// @route   DELETE /api/employees/:id
// @access  Private
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      res.status(404);
      throw new Error('Employee not found');
    }

    // Only allow deletion of user's own employees, not shared ones
    if (employee.userId && employee.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized to delete this employee');
    }

    // Can't delete shared employees
    if (!employee.userId) {
      res.status(403);
      throw new Error('Cannot delete shared employees');
    }

    await employee.deleteOne();

    res.json({ id: req.params.id, message: 'Employee deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  searchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
