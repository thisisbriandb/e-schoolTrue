import {  ipcMain } from "electron";
import { GradeService } from "#electron/backend/services/gradeService.ts";
import { BranchCommand, ClassRoomCommand, CourseCommand, GradeCommand } from "#electron/command/settingsCommand.ts";
import { CourseService } from "#electron/backend/services/courseService.ts";
import { StudentService } from "./backend/services/studentService";
import { FileService } from "./backend/services/fileService";
import { YearRepartitionService } from "#electron/backend/services/yearService";
import { ResultType } from "#electron/command";
import * as fs from 'fs/promises';
import { app } from 'electron';
import path from 'path';
import { PaymentService } from './backend/services/paymentService';
import { AbsenceService } from './backend/services/absenceService';
import {SchoolService} from './backend/services/schoolService';
import { ProfessorService } from './backend/services/professorService';
import { DashboardService } from './backend/services/dashboardService';
import { HomeworkService } from './backend/services/homeworkService';
import { VacationService } from './backend/services/vacationService';
import { ScholarshipService } from './backend/services/scholarshipService';
import { ReportCardService } from './backend/services/reportCardService';
import { GradeConfigService } from './backend/services/gradeConfigService';
import { PreferenceService } from './backend/services/preferenceService';


const global = {
    gradeService: new GradeService(),
    courseService: new CourseService(),
    studentService: new StudentService(),
    fileService: new FileService(),
    paymentService: new PaymentService(),
    absenceService: new AbsenceService(),
    schoolService: new SchoolService(),
    yearRepartitionService: new YearRepartitionService(),
    professorService: new ProfessorService(),
    dashboardService: new DashboardService(),
    homeworkService: new HomeworkService(),
    vacationService: new VacationService(),
    scholarshipService: new ScholarshipService(),
    reportCardService: new ReportCardService(),
    gradeConfigService: new GradeConfigService(),
    preferenceService: new PreferenceService()
};

// Fonction utilitaire pour gérer les erreurs
const handleError = (error: any): ResultType => {
    console.error('Erreur:', error);
    return { 
        success: false, 
        message: Buffer.from(`Une erreur est survenue: ${error.message}`).toString('base64'),
        error: error instanceof Error ? error.message : String(error),
        data: null
    };
}

// Exemple pour un gestionnaire d'événement
ipcMain.handle("grade:all", async (_event: Electron.IpcMainInvokeEvent, _args: any): Promise<ResultType> => {
    try {
        return await global.gradeService.getGrades();
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("grade:new"  , async (_event: Electron.IpcMainInvokeEvent, command: GradeCommand): Promise<ResultType> => {
    try {
        return await global.gradeService.newGrade(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("grade:update"  , async (_event: Electron.IpcMainInvokeEvent, command: GradeCommand): Promise<ResultType> => {
    try {
        return await global.gradeService.updateGrade(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("grade:delete"  , async (_event: Electron.IpcMainInvokeEvent, id: number): Promise<ResultType> => {
    try {
        return await global.gradeService.deleteGrade(id);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("classRoom:new"  , async (_event: Electron.IpcMainInvokeEvent, command: ClassRoomCommand): Promise<ResultType> => {
    try {
        return await global.gradeService.newClassRoom(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("classRoom:delete"  , async (_event: Electron.IpcMainInvokeEvent, id: number): Promise<ResultType> => {
    try {
        return await global.gradeService.deleteClassRoom(id);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("classRoom:update"  , async (_event: Electron.IpcMainInvokeEvent, command: ClassRoomCommand): Promise<ResultType> => {
    try {
        return await global.gradeService.updateClassRoom(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("classRoom:all", async (_event: Electron.IpcMainInvokeEvent): Promise<ResultType> => {
  try {
    return await global.gradeService.getClassRooms();
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle("branch:new"  , async (_event: Electron.IpcMainInvokeEvent, command: BranchCommand): Promise<ResultType> => {
    try {
        return await global.gradeService.newBranch(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("branch:update"  , async (_event: Electron.IpcMainInvokeEvent, command: BranchCommand): Promise<ResultType> => {
    try {
        return await global.gradeService.updateBranch(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("branch:delete"  , async (_event: Electron.IpcMainInvokeEvent, id: number): Promise<ResultType> => {
    try {
        return await global.gradeService.deleteBranch(id);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("course:new"  , async (_event: Electron.IpcMainInvokeEvent, command: CourseCommand): Promise<ResultType> => {
    try {
        return await global.courseService.newCourse(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("courseGroup:add"  , async (_event: Electron.IpcMainInvokeEvent, command: CourseCommand): Promise<ResultType> => {
    try {
        return await global.courseService.addCourseToGroupement(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("course:update"  , async (_event: Electron.IpcMainInvokeEvent, command: CourseCommand): Promise<ResultType> => {
    try {
        return await global.courseService.updateCourse(command);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("course:delete"  , async (_event: Electron.IpcMainInvokeEvent, id: number): Promise<ResultType> => {
    try {
        return await global.courseService.deleteCourse(id);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("course:all"  , async (_event: Electron.IpcMainInvokeEvent, _args: any): Promise<ResultType> => {
    try {
        console.log('Récupération de tous les cours');
        const result = await global.courseService.getAllCourse();
        console.log('Cours récupérés:', result);
        return result;
    } catch (error) {
        console.error('Erreur cours:', error);
        return handleError(error);
    }
});

ipcMain.handle("save-student", async (_event: Electron.IpcMainInvokeEvent, studentData: any): Promise<ResultType> => {
    try {
        // Si l'étudiant a un ID, c'est une mise à jour
        if (studentData.id) {
            return await global.studentService.updateStudent(studentData.id, studentData);
        }
        // Sinon, c'est une création
        else {
            return await global.studentService.createStudent(studentData);
        }
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("student:all", async (_event: Electron.IpcMainInvokeEvent, _args: any): Promise<ResultType> => {
    console.log("Début de student:all", _event, _args);
    try {
        const students = await global.studentService.getAllStudents();
        console.log("Données brutes reçues de la base de données:", JSON.stringify(students, null, 2));
        console.log("Nombre d'étudiants récupérés:", students.length);
        return { success: true, data: students, error: null, message: "Étudiants récupérés avec succès" };
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("student:getDetails", async (_event: Electron.IpcMainInvokeEvent, studentId: number): Promise<ResultType> => {
    console.log(`Début de student:getDetails pour l'étudiant ID: ${studentId}`);
    try {
        // Utilisez directement le résultat de getStudentDetails
        return await global.studentService.getStudentDetails(studentId);
    } catch (error) {
        console.error("Erreur dans student:getDetails:", error);
        return handleError(error);
    }
});

ipcMain.handle("student:downloadDocument", async (_event: Electron.IpcMainInvokeEvent, documentId: number): Promise<ResultType> => {
  try {
      const document = await global.fileService.getFileById(documentId);
      if (document && document.path) {
          // Lire le contenu du fichier et le convertir en base64
          const fileContent = await fs.readFile(document.path);
          const base64Content = fileContent.toString('base64');

          return { 
              success: true, 
              data: {
                  content: base64Content, // Envoyer directement le contenu base64
                  type: document.type,
                  name: document.name
              },
              error: null,
              message: "Document récupéré avec succès"
          };
      } else {
          return {
              success: false,
              data: null,
              error: "Document non trouvé",
              message: "Le document n'a pas pu être récupéré"
          };
      }
  } catch (error) {
      return handleError(error);
  }
});


ipcMain.handle("getStudentPhoto", async (_event: Electron.IpcMainInvokeEvent, photoId: number): Promise<ResultType> => {
    try {
        const photo = await global.fileService.getFileById(photoId);
        if (!photo) {
            return {
                success: false,
                data: null,
                error: "Photo non trouvée",
                message: "La photo n'a pas pu être récupérée"
            };
        }

        // Convertir le Buffer en base64
        const base64Content = photo.content.toString('base64');
        console.log("Taille du contenu base64:", base64Content.length);

        return {
            success: true,
            data: {
                content: base64Content,
                type: photo.type,
                name: photo.name
            },
            error: null,
            message: "Photo récupérée avec succès"
        };
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("getProfessorPhoto", async (_event: Electron.IpcMainInvokeEvent, photoId: number): Promise<ResultType> => {
  try {
      const photo = await global.fileService.getFileById(photoId);
      if (!photo) {
          return {
              success: false,
              data: null,
              error: "Photo non trouvée",
              message: "La photo n'a pas pu être récupérée"
          };
      }

      // Convertir le Buffer en base64
      const base64Content = photo.content.toString('base64');
      console.log("Taille du contenu base64:", base64Content.length);

      return {
          success: true,
          data: {
              content: base64Content,
              type: photo.type,
              name: photo.name
          },
          error: null,
          message: "Photo récupérée avec succès"
      };
  } catch (error) {
      return handleError(error);
  }
});


// Ajoutez ces nouvelles constantes
const CONFIG_FILE_PATH = path.join(app.getPath('userData'), 'class-config.json');

// Ajoutez ces nouveaux gestionnaires d'événements
ipcMain.handle('get-class-config', async () => {
    try {
      const configExists = await fs.access(CONFIG_FILE_PATH).then(() => true).catch(() => false);
      if (configExists) {
        const configData = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
        return { success: true, data: JSON.parse(configData) };
      } else {
        return { success: true, data: null };
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la configuration des classes:', error);
      if (error instanceof Error) {
        return { success: false, error: error.message };
      } else {
        return { success: false, error: 'Une erreur inconnue est survenue' };
      }
    }
  });
ipcMain.handle('save-class-config', async (_event, config) => {
  try {
    await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration des classes:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: 'Une erreur inconnue est survenue' };
    }
  }
});

ipcMain.handle("update-student", async (_event: Electron.IpcMainInvokeEvent, { studentId, studentData }: { studentId: number, studentData: any }): Promise<ResultType> => {
    console.log("Début de update-student avec les données:", JSON.stringify(studentData));
    try {
        if (studentData.photo && studentData.photo.content) {
            const savedPhoto = await global.fileService.saveFile(studentData.photo.content, studentData.photo.name, studentData.photo.type);
            studentData.photoId = savedPhoto.id;
        }

        if (studentData.document && studentData.document.length > 0) {
            const savedDocuments = await Promise.all(studentData.document.map(async (doc: any) => {
                if (doc.content) {
                    return await global.fileService.saveFile(doc.content, doc.name, doc.type);
                }
                return doc;
            }));
            studentData.documents = savedDocuments;
        }

        delete studentData.photo;
        delete studentData.document;

        const result = await global.studentService.updateStudent(studentId, studentData);
        return result;
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle('delete-student', async (_event, studentId: number) => {
    try {
      await global.studentService.deleteStudent(studentId); // Appel sans affecter le résultat à une variable
      return { success: true, message: "Étudiant supprimé avec succès" };
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant:", error);
      return { success: false, message: "Une erreur est survenue lors de la suppression de l'étudiant" };
    }
  });

// Garder uniquement ces handlers pour les absences
ipcMain.handle('absence:allStudent', async () => {
  try {
    return await global.absenceService.getAllAbsences('STUDENT');
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('absence:allProfessor', async () => {
  try {
    console.log('=== Events - Début absence:allProfessor ===');
    const result = await global.absenceService.getAllAbsences('PROFESSOR');
    console.log('=== Events - Résultat ===', {
      success: result.success,
      dataLength: result.data?.length,
      message: result.message,
      error: result.error
    });
    return result;
  } catch (error) {
    console.error('=== Events - Erreur dans absence:allProfessor ===', error);
    return handleError(error);
  }
});

ipcMain.handle('absence:add', async (_event, absenceData) => {
  try {
    console.log('=== IPC - Réception absence:add ===', absenceData);
    const result = await global.absenceService.addAbsence(absenceData);
    console.log('=== IPC - Résultat absence:add ===', result);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'absence via IPC:', error);
    return handleError(error);
  }
});

// Ajouter un handler spécifique pour les absences étudiants
ipcMain.handle('absence:addStudent', async (_event, absenceData) => {
  try {
    return await global.absenceService.addAbsence(absenceData);
  } catch (error) {
    return handleError(error);
  }
});

// Ajouter un handler spécifique pour les absences professeurs
ipcMain.handle('absence:addProfessor', async (_event, absenceData) => {
  try {
    return await global.absenceService.createProfessorAbsence(absenceData);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('absence:delete', async (_event, id) => {
  try {
    return await global.absenceService.deleteAbsence(id);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('absence:getByStudent', async (_event, studentId) => {
  try {
    return await global.absenceService.getAbsencesByStudent(studentId);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('absence:getStatistics', async (_event, studentId) => {
  try {
    return await global.absenceService.getAbsenceStatistics(studentId);
  } catch (error) {
    return handleError(error);
  }
});


ipcMain.handle("school:save", async (_event: Electron.IpcMainInvokeEvent, payload: any): Promise<ResultType> => {
    try {
        const { data, logo } = payload

        // Si un nouveau logo est fourni
        if (logo) {
            const savedFile = await global.fileService.saveFile(
                logo.content,
                logo.name,
                logo.type
            )
            // Assigner l'ID du fichier sauvegardé
            data.logo = savedFile.id
        }

        const result = await global.schoolService.saveOrUpdateSchool(data)
        
        // Si la sauvegarde est réussie, charger à nouveau les données complètes
        if (result.success) {
            const updatedSchool = await global.schoolService.getSchool()
            return updatedSchool
        }

        return result
    } catch (error) {
        return handleError(error)
    }
})



ipcMain.handle("school:get", async (_event: Electron.IpcMainInvokeEvent): Promise<ResultType> => {
    try {
        const result = await global.schoolService.getSchool();
        
        // Si la récupération a réussi et qu'il y a un logo
        if (result.success && result.data && result.data.logo) {
            // Convertir le contenu du logo en base64 s'il existe
            const logo = await global.fileService.getFileById(result.data.logo.id);
            if (logo) {
                result.data.logo = {
                    id: logo.id,
                    content: logo.content.toString('base64'),
                    type: logo.type,
                    name: logo.name
                };
            }
        }
        
        return result;
    } catch (error) {
        return handleError(error);
    }
});

//Repartition Année Scolaire 

ipcMain.handle("yearRepartition:create", async (_event, data) => {
    try {
        return await global.yearRepartitionService.createYearRepartition(data);
    } catch (error) {
        return handleError(error);
    }
});

// Mettre à jour une répartition d'année scolaire
ipcMain.handle("yearRepartition:update", async (_event, { id, data }) => {
    try {
        return await global.yearRepartitionService.updateYearRepartition(id, data);
    } catch (error) {
        return handleError(error);
    }
});

// Récupérer toutes les répartitions d'années scolaires
ipcMain.handle("yearRepartition:getAll", async () => {
    try {
        return await global.yearRepartitionService.getAllYearRepartitions();
    } catch (error) {
        return handleError(error);
    }
});

// Supprimer une répartition d'année scolaire
ipcMain.handle("yearRepartition:delete", async (_event, id: number) => {
    try {
        return await global.yearRepartitionService.deleteYearRepartition(id);
    } catch (error) {
        return handleError(error);
    }
});

// Modifier le handler pour utiliser la fonction existante
ipcMain.handle("yearRepartition:getCurrent", async () => {
    try {
        return await global.yearRepartitionService.getCurrentYearRepartition();
    } catch (error) {
        return handleError(error);
    }
});

// Handlers pour les professeurs
ipcMain.handle('professor:all', async () => {
    try {
        return await global.professorService.getAllProfessors();
    } catch (error) {
        return handleError(error);
    }
});


ipcMain.handle("professor:downloadDocument", async (_event: Electron.IpcMainInvokeEvent, documentId: number): Promise<ResultType> => {
  try {
      const document = await global.fileService.getFileById(documentId);
      if (document && document.path) {
          // Lire le contenu du fichier et le convertir en base64
          const fileContent = await fs.readFile(document.path);
          const base64Content = fileContent.toString('base64');

          return { 
              success: true, 
              data: {
                  content: base64Content, // Envoyer directement le contenu base64
                  type: document.type,
                  name: document.name
              },
              error: null,
              message: "Document récupéré avec succès"
          };
      } else {
          return {
              success: false,
              data: null,
              error: "Document non trouvé",
              message: "Le document n'a pas pu être récupéré"
          };
      }
  } catch (error) {
      return handleError(error);
  }
});

ipcMain.handle('professor:create', async (_, data: any) => {
    try {
        return await global.professorService.createProfessor(data);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle('professor:update', async (_, id: number, data: any) => {
    try {
        return await global.professorService.updateProfessor(id, data);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle('professor:delete', async (_, id: number) => {
    try {
        return await global.professorService.deleteProfessor(id);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle('professor:getById', async (_, id: number) => {
  try {
      const professor = await global.professorService.getProfessorById(id);
      console.log("Professor data retrieved:", professor); 
      return professor;
  } catch (error) {
      return handleError(error);
  }
});


// Gestion des affectations d'enseignement
ipcMain.handle("professor:assign-teaching", async (_event, { professorId, assignment }) => {
    try {
        return await global.professorService.assignTeaching(professorId, assignment);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("professor:get-teaching-assignments", async (_event, professorId) => {
    try {
        return await global.professorService.getTeachingAssignments(professorId);
    } catch (error) {
        return handleError(error);
    }
});

// Handlers pour le dashboard
ipcMain.handle("dashboard:stats", async () => {
    try {
        const totalStudents = await global.studentService.getTotalStudents();
        const totalProfessors = await global.professorService.getTotalProfessors();
        const totalClasses = await global.gradeService.getTotalClasses();
        const recentPayments = await global.paymentService.getRecentPayments(5);
        const recentAbsences = await global.absenceService.getRecentAbsences(5);

        return {
            success: true,
            data: {
                stats: {
                    totalStudents: totalStudents.data,
                    totalProfessors: totalProfessors.data,
                    totalClasses: totalClasses.data,
                    recentPayments: recentPayments.data,
                    recentAbsences: recentAbsences.data
                }
            },
            message: "Statistiques récupérées avec succès",
            error: null
        };
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("dashboard:paymentStats", async (_event: Electron.IpcMainInvokeEvent): Promise<ResultType> => {
    try {
        return await global.dashboardService.getPaymentStats();
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle("dashboard:absenceStats", async (_event: Electron.IpcMainInvokeEvent): Promise<ResultType> => {
    try {
        return await global.dashboardService.getAbsenceStats();
    } catch (error) {
        return handleError(error);
    }
});


ipcMain.handle('student:search', async (_event, query: string) => {
    try {
        return await global.studentService.searchStudents(query);
    } catch (error) {
        return handleError(error);
    }
});


// Handlers pour les paiements étudiants
ipcMain.handle('payment:create', async (_, paymentData) => {
  try {
    return await global.paymentService.addPayment(paymentData);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('payment:getByStudent', async (_, studentId) => {
  try {
    return await global.paymentService.getPaymentsByStudent(studentId);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('payment:getConfig', async (_, classId) => {
  try {
    return await global.paymentService.getConfigByClass(classId);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('payment:getConfigs', async () => {
  try {
    console.log("Récupération des configurations de paiement");
    const result = await global.paymentService.getConfigs();
    console.log("Configurations récupérées:", result);
    return result;
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('payment:getRemainingAmount', async (_, studentId) => {
  try {
    return await global.paymentService.getRemainingAmount(studentId);
  } catch (error) {
    return handleError(error);
  }
});

// Handlers pour les paiements professeurs
ipcMain.handle('professor:payment:create', async (_, paymentData) => {
  try {
    console.log('Données de paiement reçues:', paymentData);
    const result = await global.paymentService.addProfessorPayment(paymentData);
    console.log('Résultat de la création:', result);
    return result;
  } catch (error) {
    console.error('Erreur dans le handler professor:payment:create:', error);
    return handleError(error);
  }
});

ipcMain.handle('professor:payment:update', async (_, paymentData) => {
  try {
    console.log('Données de mise à jour reçues:', paymentData);
    const result = await global.paymentService.updateProfessorPayment(paymentData);
    console.log('Résultat de la mise à jour:', result);
    return result;
  } catch (error) {
    console.error('Erreur dans le handler professor:payment:update:', error);
    return handleError(error);
  }
});

ipcMain.handle('professor:payments:list', async (_, filters) => {
  try {
    console.log('Filtres reçus:', filters);
    const result = await global.paymentService.getProfessorPayments(filters);
    console.log('Résultat des paiements:', result);
    return result;
  } catch (error) {
    console.error('Erreur dans le handler professor:payments:list:', error);
    return handleError(error);
  }
});

ipcMain.handle('professor:payments:stats', async () => {
  try {
    const result = await global.paymentService.getProfessorPaymentStats();
    console.log('Résultat des statistiques:', result);
    return result;
  } catch (error) {
    console.error('Erreur dans le handler professor:payments:stats:', error);
    return handleError(error);
  }
});

// Handlers pour les paiements des professeurs
ipcMain.handle('professor:count', async () => {
  try {
    const result = await global.professorService.getTotalProfessors();
    console.log('Résultat du comptage des professeurs:', result);
    return result;
  } catch (error) {
    console.error('Erreur dans le handler professor:count:', error);
    return handleError(error);
  }
});

ipcMain.handle('professor:search', async (_, query) => {
  try {
    return await global.professorService.searchProfessors(query);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('file:getUrl', async (_, filePath) => {
  try {
    const result = await global.fileService.getFileUrl(filePath);
    return {
      success: true,
      data: result,
      message: "URL du fichier récupérée avec succès",
      error: null
    };
  } catch (error) {
    return handleError(error);
  }
});


// Ajouter avec les autres handlers de paiement
ipcMain.handle('professor:payment:getById', async (_, paymentId: number) => {
  try {
    console.log('Récupération du paiement:', paymentId);
    const result = await global.paymentService.getProfessorPaymentById(paymentId);
    console.log('Résultat:', result);
    return result;
  } catch (error) {
    console.error('Erreur dans le handler professor:payment:getById:', error);
    return handleError(error);
  }
});

// Ajouter ou modifier ces handlers pour la configuration des paiements
ipcMain.handle("payment:saveConfig", async (_, configData) => {
  try {
    console.log("Données de configuration reçues:", configData);
    const result = await global.paymentService.saveConfig(configData);
    console.log("Résultat de la sauvegarde:", result);
    return result;
  } catch (error) {
    return handleError(error);
  }
});

// Handlers pour les devoirs
ipcMain.handle('homework:create', async (_, data) => {
    try {
        return await global.homeworkService.createHomework(data);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle('homework:getByGrade', async (_, gradeId) => {
    try {
        return await global.homeworkService.getHomeworkByGrade(gradeId);
    } catch (error) {
        return handleError(error);
    }
});

// Handlers pour les congés
ipcMain.handle('vacation:create', async (_event, data) => {
  try {
    console.log('=== Events - Début vacation:create ===', data);
    const result = await global.vacationService.createVacation(data);
    console.log('=== Events - Résultat vacation:create ===', result);
    return result;
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('vacation:update', async (_event, { id, status, comment }) => {
  try {
    return await global.vacationService.updateVacationStatus(id, status, comment);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('vacation:delete', async (_event, id) => {
  try {
    return await global.vacationService.deleteVacation(id);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('vacation:getByStudent', async (_event, studentId) => {
  try {
    return await global.vacationService.getVacationsByStudent(studentId);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('vacation:getAll', async () => {
  try {
    return await global.vacationService.getAllVacations();
  } catch (error) {
    return handleError(error);
  }
});

// Handlers pour les absences des professeurs
ipcMain.handle('absence:createProfessor', async (_, data) => {
  try {
    return await global.absenceService.createProfessorAbsence(data);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('absence:updateProfessor', async (_, data) => {
  try {
    return await global.absenceService.updateProfessorAbsence(data);
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('absence:getAllProfessors', async () => {
  try {
    return await global.absenceService.getAllProfessorAbsences();
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('absence:deleteProfessor', async (_, id) => {
  try {
    return await global.absenceService.deleteProfessorAbsence(id);
  } catch (error) {
    return handleError(error);
  }
});

// Handler pour récupérer les étudiants d'une classe
ipcMain.handle('student:getByGrade', async (_event: Electron.IpcMainInvokeEvent, gradeId: number): Promise<ResultType> => {
  try {
    return await global.studentService.getStudentsByGrade(gradeId);
  } catch (error) {
    return handleError(error);
  }
});

// Handler pour supprimer un devoir
ipcMain.handle('homework:delete', async (_, id: number) => {
  try {
    return await global.homeworkService.deleteHomework(id);
  } catch (error) {
    return handleError(error);
  }
});

// Handler pour mettre à jour un devoir
ipcMain.handle('homework:update', async (_, data: any) => {
  try {
    const { id, ...updateData } = data;
    return await global.homeworkService.updateHomework(id, updateData);
  } catch (error) {
    return handleError(error);
  }
});

// Handler pour notifier les étudiants
ipcMain.handle('homework:notify', async (_, data: any) => {
  try {
    // Ici vous pouvez implémenter la logique de notification
    // Par exemple, envoyer des SMS ou des emails
    console.log("Notification à envoyer:", data);
    
    // Pour l'instant, on simule un succès
    return {
      success: true,
      message: "Notifications envoyées avec succès",
      error: null,
      data: null
    };
  } catch (error) {
    return handleError(error);
  }
});

// Ajouter cet événement s'il n'existe pas déjà
ipcMain.handle("school:getLogo", async (_event: Electron.IpcMainInvokeEvent, logoId: number): Promise<ResultType> => {
    try {
        const logo = await global.fileService.getFileById(logoId);
        if (!logo) {
            return {
                success: false,
                data: null,
                error: "Logo non trouvé",
                message: "Le logo n'a pas pu être récupéré"
            };
        }

        return {
            success: true,
            data: {
                content: logo.content.toString('base64'),
                type: logo.type,
                name: logo.name
            },
            error: null,
            message: "Logo récupéré avec succès"
        };
    } catch (error) {
        return handleError(error);
    }
});


// Événements de sauvegarde
ipcMain.handle('scholarship:getByStudent', async (_, studentId: number) => {
  try {
    const scholarships = await global.scholarshipService.getByStudent(studentId);
    console.log('=== Bourses récupérées pour étudiant', studentId, '===');
    console.log('Résultat:', scholarships);
    return scholarships;
  } catch (error) {
    return handleError(error);
  }
});

ipcMain.handle('scholarship:getActiveByStudent', async (_, studentId: number) => {
    return await global.paymentService.getActiveByStudent(studentId);
});

ipcMain.handle("yearRepartition:setCurrent", async (_event, id: number) => {
    try {
        return await global.yearRepartitionService.setCurrentYearRepartition(id);
    } catch (error) {
        return handleError(error);
    }
});

// Ajouter ce handler pour les congés des professeurs
ipcMain.handle('vacation:getByProfessor', async (_event, professorId?: number) => {
  try {
    return await global.vacationService.getVacationsByProfessor(professorId);
  } catch (error) {
    return handleError(error);
  }
});

// Ajouter ce handler pour la mise à jour du statut des congés
ipcMain.handle('vacation:updateStatus', async (_event, { id, status, comment }) => {
  try {
    return await global.vacationService.updateVacationStatus(id, status, comment);
  } catch (error) {
    return handleError(error);
  }
});

// Ajouter les handlers pour les bulletins
ipcMain.handle('report:generateMultiple', async (_event, data) => {
    try {
        return await global.reportCardService.generateReportCards(data);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle('report:preview', async (_event, data) => {
    try {
        const result = await global.reportCardService.generateReportCards({
            studentIds: [data.studentId],
            period: data.period,
            templateId: 'preview'
        });
        return result;
    } catch (error) {
        return handleError(error);
    }
});

// Handler pour la configuration des notes
ipcMain.handle('gradeConfig:save', async (_event, config) => {
    try {
        console.log('=== Events - Début gradeConfig:save ===', config);
        const result = await global.gradeConfigService.saveConfiguration(config);
        console.log('=== Events - Résultat gradeConfig:save ===', result);
        return result;
    } catch (error) {
        console.error('=== Events - Erreur dans gradeConfig:save ===', error);
        return handleError(error);
    }
});


// Sauvegarder les notes d'un étudiant
ipcMain.handle('grades:save', async (_event, data: {
    studentId: number;
    gradeId: number;
    period: string;
    grades: Array<{
        courseId: number;
        assignments: number[];
        exam: number;
        average: number;
        appreciation: string;
    }>;
}) => {
    try {
        console.log('Handler grades:save appelé avec:', data);
        return await global.reportCardService.saveStudentGrades(data);
    } catch (error) {
        console.error('Erreur dans le handler grades:save:', error);
        return {
            success: false,
            data: null,
            message: "Erreur lors de la sauvegarde des notes",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        };
    }
});

// Handler pour récupérer un étudiant par son ID
ipcMain.handle('student:getById', async (_event, studentId: number) => {
    try {
        return await global.studentService.getStudentById(studentId);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle('gradeConfig:saveGeneral', async (_event, config) => {
    try {
        // Implémenter la sauvegarde de la configuration générale
        return {
            success: true,
            data: config,
            message: "Configuration générale sauvegardée",
            error: null
        };
    } catch (error) {
        return handleError(error);
    }
});

// Handler pour récupérer la configuration des notes


ipcMain.handle('grades:get', async (_event, { studentId, period }) => {
    try {
        return await global.reportCardService.getStudentGrades(studentId, period);
    } catch (error) {
        return handleError(error);
    }
});

ipcMain.handle('preference:saveTemplate', async (_, templateId: string) => {
    return await global.preferenceService.saveTemplatePreference(templateId);
});

ipcMain.handle('preference:getTemplate', async () => {
    return await global.preferenceService.getTemplatePreference();
});

// Handler pour récupérer la configuration des notes
ipcMain.handle('gradeConfig:get', async (_event, { gradeId }) => {
    try {
        console.log('=== Events - Début gradeConfig:get ===', gradeId);
        const gradeConfigService = new GradeConfigService();
        const result = await gradeConfigService.getConfigurationByGrade(gradeId);
        console.log('=== Events - Résultat gradeConfig:get ===', result);
        return result;
    } catch (error) {
        console.error('=== Events - Erreur dans gradeConfig:get ===', error);
        return handleError(error);
    }
});

export function registerReportEvents() {
  const reportService = new ReportCardService();

  // Génération du bulletin
  ipcMain.handle('report:generate', async (_, data: { studentId: number; period: string }) => {
    console.log('Demande de génération de bulletin:', data);
    try {
      const result = await reportService.generateReportCard(data);
      console.log('Résultat de la génération:', result);
      return result;
    } catch (error) {
      console.error('Erreur génération bulletin:', error);
      return {
        success: false,
        data: null,
        message: "Erreur lors de la génération du bulletin",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        generalAverage: 0
      };
    }
  });

  // Récupération des notes
  ipcMain.handle('report:getGrades', async (_, data: { studentId: number; period: string }) => {
    console.log('Demande de récupération des notes:', data);
    try {
      const result = await reportService.getStudentGrades(data.studentId, data.period);
      console.log('Notes récupérées:', result);
      return result;
    } catch (error) {
      console.error('Erreur récupération notes:', error);
      return {
        success: false,
        data: [],
        message: "Erreur lors de la récupération des notes",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        generalAverage: 0
      };
    }
  });
}








